import scipy
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict, List


SCORE_THRESHOLD = 0.2

HARD_CODED_EMAIL_MAPPING = {
    "devin@devinsit.com": "dsit068@uottawa.ca",
    "dynamic11@gmail.com": "Ali.Nouri@canada.ca",
    "19962651+Liannus@users.noreply.github.com": "joshua.gorman@canada.ca",
    "46499132+HeyaImPrizm@users.noreply.github.com": "jared.ridyard2@canada.ca"
}


def generate_ngrams(email, n=3):
    # Strip out the part of the email after the '@' sign, since we don't care about the domain
    beforeAt = email.split("@")[0].lower()

    # Strip out any numbers, symbols, etc to only keep the characters, since it's more likely
    # that just the name will be more meaningful when trying to find matching emails.
    withoutSymbols = "".join(x for x in beforeAt if x.isalpha())

    ngrams = zip(*[withoutSymbols[i:] for i in range(n)])
    return ["".join(ngram) for ngram in ngrams]


class EmailMatcher:
    def __init__(self):
        self.tf_idf_vectorizer = TfidfVectorizer(analyzer=generate_ngrams)

    def find_matching_emails(
        self,
        new_emails: List[str],
        base_emails: List[str],
        hard_email_mapping: Dict[str, str] = HARD_CODED_EMAIL_MAPPING
    ) -> Dict[str, str]:
        all_emails = new_emails + base_emails

        similarities = self._generate_similarities_matrix(all_emails)
        base_matches = []

        for new_email_index in range(len(new_emails)):
            new_email = new_emails[new_email_index]

            if hard_email_mapping and new_email in hard_email_mapping:
                base_matches.append(hard_email_mapping[new_email])
            else:
                match_indices = similarities[new_email_index].argsort()

                top_match_list = list(filter(
                    lambda match_index: (
                        match_index != new_email_index
                        and match_index >= len(new_emails)
                        and similarities[new_email_index][match_index] >= SCORE_THRESHOLD
                    ),
                    match_indices
                ))

                top_match = all_emails[top_match_list[-1]] if len(top_match_list) else None
                base_matches.append(top_match)

        matching_email_mapping = (
            pd
                .DataFrame({"new": new_emails, "base": base_matches})
                .set_index("new")["base"]
                .to_dict()
        )

        return matching_email_mapping

    def _generate_similarities_matrix(self, emails: List[str]) -> scipy.sparse.csr_matrix:
        tf_idf_matrix = self.tf_idf_vectorizer.fit_transform(emails)
        return cosine_similarity(tf_idf_matrix)
