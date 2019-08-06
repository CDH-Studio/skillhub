import scipy
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict, List


# Score threshold was experimentally determined until the results looked about right.
# (i.e. almost arbitrary)
SCORE_THRESHOLD = 0.2

# Set of known git emails that map to Jira emails. In the future,
# this kind of thing could be extended by having the user specify their git email
# in Skillhub, but that is way out of scope.
HARD_CODED_EMAIL_MAPPING = {
    "devin@devinsit.com": "dsit068@uottawa.ca",
    "dynamic11@gmail.com": "Ali.Nouri@canada.ca",
    "19962651+Liannus@users.noreply.github.com": "joshua.gorman@canada.ca",
    "46499132+HeyaImPrizm@users.noreply.github.com": "jared.ridyard2@canada.ca"
}


def generate_ngrams(email, n=3):
    """Handles parsing the emails into a set of ngrams."""
    if not email:
        return []

    # Strip out the part of the email after the '@' sign, since we don't care about the domain
    beforeAt = email.split("@")[0].lower()

    # Strip out any numbers, symbols, etc to only keep the characters, since it's more likely
    # that just the name will be more meaningful when trying to find matching emails.
    withoutSymbols = "".join(x for x in beforeAt if x.isalpha())

    ngrams = zip(*[withoutSymbols[i:] for i in range(n)])
    return ["".join(ngram) for ngram in ngrams]


class EmailMatcher:
    """
    Takes a list of existing emails (e.g. from the Skillhub backend database that were scraped from Jira) and
    uses them to match against the a new set of emails (e.g. from git repo commits).

    This is necessary to handle the often case whereby some/a lot of people don't necessarily setup
    their git email to match their Jira email.

    This matching makes the grand assumption that a person's git email closely resembles their Jira email
    (e.g. they both have some semblance of their name in the front half of the email).

    If this isn't the case, then a hard-coded mapping of known git -> jira emails is used as a last resort.
    Otherwise, we just can't map skills to those people who have unknown git emails.
    """

    def __init__(self):
        self.tf_idf_vectorizer = TfidfVectorizer(analyzer=generate_ngrams)

    def find_matching_emails(
        self,
        new_emails: List[str],
        base_emails: List[str],
        hard_email_mapping: Dict[str, str] = HARD_CODED_EMAIL_MAPPING
    ) -> Dict[str, str]:
        """
        Handles doing the matching of new emails to base emails.

        Works by using cosine similarity to compare the ngrams (n=3) of the front half
        of all the emails (i.e. before the '@'). Ignores any numbers or symbols, looking only
        at alphabetical characters. The assumption here is that people would have their name
        in all of their emails, just with different variations.

        For a deeper dive into how this all works, here's an article that explains it well:
        https://bergvca.github.io/2017/10/14/super-fast-string-matching.html

        @param new_emails           The list of new emails to try and find and matches in base_emails.
        @param base_emails          The base set of emails to find matches in.
        @param hard_email_mapping   An optional set of known new -> base email mappings.

        @return A dict keyed by 'new_email' mapping to 'base_email' (or None, if no reasonable match is found).
        """
        base_matches = []

        # Combine the new and base emails together into one list. It is noteworthy that the
        # new emails are _before_ the base emails, since we'll use indices to find their
        # matches later.
        all_emails = new_emails + base_emails

        # Generate the cosine similarity matrix for all of the emails' 3-grams
        similarities = self._generate_similarities_matrix(all_emails)

        # Loop over just the indices of the new emails, since we only care to find the matching
        # emails for the new ones, and they come first in the matrix.
        for new_email_index in range(len(new_emails)):
            new_email = new_emails[new_email_index]

            # Escape-hatch for any known hard-coded mappings
            if hard_email_mapping and new_email in hard_email_mapping:
                base_matches.append(hard_email_mapping[new_email])
            else:
                # Get the indices of the matching emails, sorted from least matching to most matching.
                # Note: This list includes the index of every email -- it's just that most will probably
                # have a cosine similarity of 0.
                match_indices = similarities[new_email_index].argsort()

                # Filter the matching indices down to just those that meet the threshold.
                top_match_list = list(filter(
                    lambda match_index: (
                        # We don't want to include the index of the email itself, since that doesn't help.
                        match_index != new_email_index
                        # Only keep base emails as matches; we don't want to match a new email against a new email.
                        and match_index >= len(new_emails)
                        # Only keep matches that meet the score threshold; everything else is too weak.
                        and similarities[new_email_index][match_index] >= SCORE_THRESHOLD
                    ),
                    match_indices
                ))

                # Take the best match (which is at the end of the list, since it's sorted ascending).
                top_match = all_emails[top_match_list[-1]] if len(top_match_list) else None
                base_matches.append(top_match)

        # Create the dict of "new email" -> "base email"
        matching_email_mapping = (
            pd
                .DataFrame({"new": new_emails, "base": base_matches})
                .set_index("new")["base"]
                .to_dict()
        )

        return matching_email_mapping

    def _generate_similarities_matrix(self, emails: List[str]) -> scipy.sparse.csr_matrix:
        """Generates the cosine similarity matrix for the email ngrams."""
        # Use the tf_idf vectorizer to generate the ngram matrix,
        # and then perform the cosine similarity calculations.
        tf_idf_matrix = self.tf_idf_vectorizer.fit_transform(emails)
        return cosine_similarity(tf_idf_matrix)
