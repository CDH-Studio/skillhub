import logging
import pandas as pd
from typing import Any, Callable, Dict, List
from utils import LoggingUtils


logger = logging.getLogger(__name__)

RawIssueType = Dict[str, Any]
RawFieldType = Dict[str, Any]

IssueType = Dict[str, Any]
ChangelogType = Dict[str, Any]
CommentType = Dict[str, Any]
WorklogType = Dict[str, Any]

FeaturesType = Dict[str, float]

# Map of all known statuses down to just a specific set that is useful for our purposes:
# To Do, In Progress, Review, Done
status_map = {
    "Abandoned": "Done",
    "Client Reviewed": "Review",
    "Closed": "Done",
    "Code Complete": "Review",
    "Delivery - Development": "In Progress",
    "Delivery - Peer Review": "Review",
    "Delivery - Ready": "Review",
    "Delivery - Testing": "Review",
    "Delivery - User Acceptance Testing (UAT)": "Review",
    "Developing (Delivery)": "In Progress",
    "Development (Delivery)": "In Progress",
    "Discovery - Prototypes and Proof of Concepts": "In Progress",
    "Discovery - User Story Elaboration": "In Progress",
    "Discovery - Validation": "In Progress",
    "Draft": "To Do",
    "Escalated": "In Progress",
    "Estimating (Delivery)": "To Do",
    "Hold": "In Progress",
    "in QA": "Review",
    "In Review": "Review",
    "On Hold": "To Do",
    "Open": "To Do",
    "Parked": "To Do",
    "Peer Review (Delivery)": "Review",
    "Peer reviewing (Delivery)": "Review",
    "Prototyping (Discovery)": "In Progress",
    "QA": "Review",
    "Ready (Delivery)": "Review",
    "Ready for QA": "Review",
    "Ready": "To Do",
    "Release - Ready": "Review",
    "Released": "Done",
    "Releasing": "Done",
    "Reopened": "To do",
    "Resolved": "Done",
    "Tech review": "Review",
    "Testing (Delivery)": "Review",
    "To do": "To Do",
    "UAT (Delivery)": "Review",
    "UAT": "Review",
    "Under Review": "Review",
    "User Accept Testing": "Review",
    "Validating (Discovery)": "Review",
    "Validation (Discovery)": "Review",
    "Waiting for support": "In Progress"
}


def filter_high_priority_issues(df: pd.DataFrame) -> pd.Series:
    """Helper function for filtering issues down to just high priority ones"""
    return df[
        (df["priority"] == "High")
        | (df["priority"] == "Blocker")
        | (df["priority"] == "Major")
        | (df["priority"] == "Highest")
        | (df["priority"] == "Critical")
    ]


def filter_status_change_changelogs(df: pd.DataFrame, status: str = "Done") -> pd.Series:
    """Helper function for filtering changelogs down to just a particular type of status change"""
    changelogs_status_df = df[df["field"] == "status"]

    changelogs_status_df["from"] = changelogs_status_df["from"].replace(status_map)
    changelogs_status_df["to"] = changelogs_status_df["to"].replace(status_map)

    return changelogs_status_df[
        (changelogs_status_df["from"] == status)
        | (changelogs_status_df["to"] == status)
    ]


def issue_fields_map(issue: RawIssueType = {}, fields: RawFieldType = {}) -> IssueType:
    """The map of Jira Issue schema -> Processed Jira Data (issues_df)"""
    return {
        "id": issue.get("id"),
        "key": issue.get("key"),
        "type": fields.get("issuetype", {}).get("name"),
        "projectName": fields.get("project", {}).get("name"),
        "projectKey": fields.get("project", {}).get("key"),
        "created": fields.get("created", {}),
        "priority": fields.get("priority", {}).get("name"),
        "assigneeName": fields.get("assignee", {}).get("displayName"),
        "assigneeEmail": fields.get("assignee", {}).get("emailAddress"),
        "updated": fields.get("updated", {}),
        "status": fields.get("status", {}).get("name"),
        "creatorName": fields.get("creator", {}).get("displayName"),
        "creatorEmail": fields.get("creator", {}).get("emailAddress"),
        "reporterName": fields.get("reporter", {}).get("displayName"),
        "reporterEmail": fields.get("reporter", {}).get("emailAddress"),
        "commentCount": fields.get("comment", {}).get("total"),
        "worklogCount": fields.get("worklog", {}).get("total")
    }


def changelog_fields_map(
    issue: RawIssueType = {},
    fields: RawFieldType = {},
    author: RawFieldType = {},
    change: RawFieldType = {},
    item: RawFieldType = {}
) -> ChangelogType:
    """The map of Jira Changelog schema -> Processed Jira Data (changelogs_df)"""
    return {
        "created": change.get("created"),
        "issueId": issue.get("id"),
        "issueKey": issue.get("key"),
        "authorName": author.get("displayName"),
        "authorEmail": author.get("emailAddress"),
        "field": item.get("field"),
        "fieldType": item.get("fieldtype"),
        "from": item.get("fromString", ""),
        "to": item.get("toString", ""),
        "projectName": fields.get("project", {}).get("name"),
        "projectKey": fields.get("project", {}).get("key"),
        "assigneeName": fields.get("assignee", {}).get("displayName"),
        "assigneeEmail": fields.get("assignee", {}).get("emailAddress"),
    }


def comment_fields_map(
    issue: RawIssueType = {},
    fields: RawFieldType = {},
    author: RawFieldType = {},
    comment: RawFieldType = {}
) -> CommentType:
    """The map of Jira Comment schema -> Processed Jira Data (comments_df)"""
    return {
        "id": comment.get("id"),
        "created": comment.get("created"),
        "issueId": issue.get("id"),
        "issueKey": issue.get("key"),
        "authorName": author.get("displayName"),
        "authorEmail": author.get("emailAddress"),
        "projectName": fields.get("project", {}).get("name"),
        "projectKey": fields.get("project", {}).get("key"),
        "body": comment.get("body"),
    }


def worklog_fields_map(
    issue: RawIssueType = {},
    fields: RawFieldType = {},
    author: RawFieldType = {},
    worklog: RawFieldType = {}
) -> WorklogType:
    """The map of Jira Worklog schema -> Processed Jira Data (worklogs_df)"""
    return {
        "id": worklog.get("id"),
        "created": worklog.get("created"),
        "issueId": issue.get("id"),
        "issueKey": issue.get("key"),
        "authorName": author.get("displayName"),
        "authorEmail": author.get("emailAddress"),
        "projectName": fields.get("project", {}).get("name"),
        "projectKey": fields.get("project", {}).get("key"),
        "timeSpent": worklog.get("timeSpentSeconds", 0) / 3600  # Convert to hours
    }


def issue_features(issues: pd.DataFrame = pd.DataFrame()) -> FeaturesType:
    """
    The map of Processed Jira Data (issues_with_all_assignees_df) -> Issue Features
    This gets used with `issues_with_all_assignees_df`
    """
    bug_ticket_count = len(issues[issues["type"].str.contains("bug", case=False)]) if len(issues) > 0 else 0
    done_ticket_count = len(issues[issues["status"].str.contains("done", case=False)]) if len(issues) > 0 else 0
    high_priority_ticket_count = len(filter_high_priority_issues(issues)) if len(issues) > 0 else 0

    return {
        "ticket_count": len(issues),
        "bug_ticket_count": bug_ticket_count,
        "done_ticket_count": done_ticket_count,
        "high_priority_ticket_count": high_priority_ticket_count
    }


def issue_creator_features(issues: pd.DataFrame = pd.DataFrame()) -> FeaturesType:
    """
    The map of Processed Jira Data (issues_df) -> Issue Features (for creator tickets)
    This gets used with `issues_df` (unlike `issues_with_all_assignees_df`), since we don't
    want duplicate creator issue counts.
    """
    return {
        "creator_ticket_count": len(issues)
    }


def changelog_features(changelogs: pd.DataFrame = pd.DataFrame()) -> FeaturesType:
    """The map of Processed Jira Data (changelogs_df) -> Changelog Features"""
    status_change_changelog_count = len(filter_status_change_changelogs(changelogs)) if len(changelogs) > 0 else 0

    return {
        "changelog_count": len(changelogs),
        "status_change_changelog_count": status_change_changelog_count
    }


def comment_features(comments: pd.DataFrame = pd.DataFrame()) -> FeaturesType:
    """The map of Processed Jira Data (comments_df) -> Comment Features"""
    return {
        "comment_count": len(comments)
    }


def worklog_features(worklogs: pd.DataFrame = pd.DataFrame()) -> FeaturesType:
    """The map of Processed Jira Data (worklogs_df) -> Worklog Features"""
    time_spent = worklogs["timeSpent"].sum() if len(worklogs) > 0 else 0

    return {
        "time_spent": time_spent
    }


# The predefined sets of columns for each Processed Jira Data schema.
# These are used when defining the various processed dataframes to ensure they
# have a specific format, even if they are missing data.
ISSUE_COLUMNS = list(issue_fields_map().keys())
CHANGELOG_COLUMNS = list(changelog_fields_map().keys())
COMMENT_COLUMNS = list(comment_fields_map().keys())
WORKLOG_COLUMNS = list(worklog_fields_map().keys())

# The predefined sets of feature columns for each part of the feature vectors.
# Like above, these are used when defining the various feature vector dataframes to
# ensure they have a specific format, even if they are missing data.
ISSUE_FEATURE_COLUMNS = list(issue_features().keys())
ISSUE_CREATOR_FEATURE_COLUMNS = list(issue_creator_features().keys())
CHANGELOG_FEATURE_COLUMNS = list(changelog_features().keys())
COMMENT_FEATURE_COLUMNS = list(comment_features().keys())
WORKLOG_FEATURE_COLUMNS = list(worklog_features().keys())


class ProcessedJiraData:
    """
    Handles taking in raw issue data straight from Jira and processing it into a more clean
    and usable format for analysis.
    Also handles converting that processed format into a set of feature vectors that can be
    used to train or predict on a machine learning model.
    """

    def __init__(self, raw_issues: List[RawIssueType]) -> None:
        if len(raw_issues) != 0:
            self.process_data(raw_issues)
        else:
            logger.warn("Received an empty list of raw issues; not processing anything")

    @LoggingUtils.log_execution_time("Jira data processing finished")
    def process_data(self, raw_issues: List[RawIssueType]) -> None:
        """Performs the processing to transform the raw Jira issues into our processed Jira data format."""
        logger.info("Starting jira data processing...")

        issues = []
        changelogs = []
        comments = []
        worklogs = []

        for issue in raw_issues:
            fields = issue.get("fields", {})

            # For some reason, when using `.get("...", {})`, these fields ignore the 'empty'
            # condition and it ends up just returning None instead of an empty object.
            # But it's _only_ these fields... ¯\_(ツ)_/¯
            # These statements just make sure they get set to empty objects if they're 'actually' empty.
            fields["creator"] = fields["creator"] if fields["creator"] else {}
            fields["priority"] = fields["priority"] if fields["priority"] else {}
            fields["assignee"] = fields["assignee"] if fields["assignee"] else {}

            issues.append(self._format_issue(issue))
            changelogs.extend(self._format_changelogs(issue))
            comments.extend(self._format_comments(issue))
            worklogs.extend(self._format_worklogs(issue))

        # Explicitly set the columns so that, even if there are 0 rows,
        # later operations still know the expected structure of the DataFrame.
        self.issues_df = self._replace_statuses(pd.DataFrame(issues, columns=ISSUE_COLUMNS))
        self.changelogs_df = pd.DataFrame(changelogs, columns=CHANGELOG_COLUMNS)
        self.comments_df = pd.DataFrame(comments, columns=COMMENT_COLUMNS)
        self.worklogs_df = pd.DataFrame(worklogs, columns=WORKLOG_COLUMNS)

        self.issues_with_all_assignees_df = self._duplicate_issues_for_all_assignees(self.issues_df, self.changelogs_df)

        logger.info("issues count: {}".format(len(self.issues_df)))
        logger.info("changelogs count: {}".format(len(self.changelogs_df)))
        logger.info("comments count: {}".format(len(self.comments_df)))
        logger.info("worklogs count: {}".format(len(self.worklogs_df)))
        logger.info("issues_with_all_assignees count: {}".format(len(self.issues_with_all_assignees_df)))

    @LoggingUtils.log_execution_time("Feature vector generation finished")
    def generate_feature_vectors(self) -> pd.DataFrame:
        """Converts the processed Jira data into a set of feature vectors for a model to train/predict on."""
        logger.info("Starting feature vector generation...")

        feature_mappings = self._get_feature_mappings()

        raw_features = []
        feature_columns = []

        for feature_mapping in feature_mappings:
            features = self._map_features(
                feature_mapping["data"],
                feature_mapping["groupby"],
                feature_mapping["features_transform"]
            )

            raw_features.append(features)

            # Aggregate all of the column names together so that the final features DataFrame
            # can have all of the columns even if one of the raw_features is empty.
            feature_columns.extend(feature_mapping["columns"])

        # Join all of the features together to create a single DataFrame with all of the columns.
        feature_vectors_df = raw_features[0].join(raw_features[1:-1], how="outer").fillna(0)

        # Fill out any columns that are missing with just zeros.
        for column in feature_columns:
            if column not in feature_vectors_df.columns:
                logging.info("'{}' was a missing column".format(column))
                feature_vectors_df[column] = 0

        feature_vectors_df = self._calculate_contribution_ratios(feature_vectors_df)

        # Sort the columns so that the features are always in a consistent order
        feature_vectors_df = feature_vectors_df.reindex(sorted(feature_vectors_df.columns), axis=1)
        logger.info("Feature vectors count: {}".format(len(feature_vectors_df)))
        logger.info("Feature vectors columns: {}".format(feature_vectors_df.columns))

        return feature_vectors_df

    def _get_feature_mappings(self) -> List[Dict[str, Any]]:
        """Generates the set of mappings used to convert processed data into features."""
        return [
            {
                "data": self.issues_with_all_assignees_df,
                "groupby": ["projectKey", "assigneeName"],
                "features_transform": issue_features,
                "columns": ISSUE_FEATURE_COLUMNS
            },
            {
                "data": self.issues_df,
                "groupby": ["projectKey", "creatorName"],
                "features_transform": issue_creator_features,
                "columns": ISSUE_CREATOR_FEATURE_COLUMNS
            },
            {
                "data": self.changelogs_df,
                "groupby": ["projectKey", "authorName"],
                "features_transform": changelog_features,
                "columns": CHANGELOG_FEATURE_COLUMNS
            },
            {
                "data": self.comments_df,
                "groupby": ["projectKey", "authorName"],
                "features_transform": comment_features,
                "columns": COMMENT_FEATURE_COLUMNS
            },
            {
                "data": self.worklogs_df,
                "groupby": ["projectKey", "authorName"],
                "features_transform": worklog_features,
                "columns": WORKLOG_FEATURE_COLUMNS
            }
        ]

    def _map_features(
        self,
        data: pd.DataFrame,
        groupby: List[str],
        features_transform: Callable[[pd.DataFrame], FeaturesType]
    ) -> pd.DataFrame:
        """Takes the configuration from a feature mapping and applies it to convert processed data into features."""
        # Perform the transformation of raw data to features
        features = data.groupby(groupby).apply(lambda df: pd.DataFrame(features_transform(df), index=[0]))

        if len(features) > 0:
            # Get rid of the extra index that is introduced from doing an 'apply' on a 'groupby'
            features = features.droplevel(-1)

            # Rename the second index so that it's consistent between all of the DataFrames
            features.index.levels[1].name = "name"

        return features

    def _calculate_contribution_ratios(self, feature_vectors_df: pd.DataFrame) -> pd.DataFrame:
        """
        Calculates, for each feature, for each person, the percentage of the total that
        the person contributed towards that feature.
        For example, "time_spent_ratio" would be the derived contribution ratio column for the
        "time_spent" feature, where it is calculated as "time_spent" / "total time_spent for project".

        @param feature_vectors_df: The dataframe of features, where each row is a person, and each column is a feature
        @return: The feature_vectors_df enhanced with all of the contribution ratio columns
        """
        for column in feature_vectors_df:
            ratio_column = column + "_ratio"

            # Create a new column that is derived by dividing the given feature column
            # by the total of each project's count for that feature.
            # Yes, this actually does calculate the ratio of how much each person contributed
            # to each particular feature, for each project.
            feature_vectors_df[ratio_column] = (
                feature_vectors_df[column] / feature_vectors_df.groupby(level=0)[column].sum()
            )

        return feature_vectors_df.fillna(0)

    def _format_issue(self, issue: RawIssueType) -> IssueType:
        """Formats a single issue from raw Jira schema to Processed Jira data schema."""
        fields = issue.get("fields", {})
        return issue_fields_map(issue, fields)

    def _format_changelogs(self, issue: RawIssueType) -> List[ChangelogType]:
        """Formats an issue's changelogs from raw Jira schema to Processed Jira data schema."""
        processed_changelogs = []

        fields = issue.get("fields", {})
        changelog = issue.get("changelog", {}).get("histories", [])

        for change in changelog:
            author = change.get("author", {})
            items = change.get("items", [])

            for item in items:
                processed_change = changelog_fields_map(issue, fields, author, change, item)
                processed_changelogs.append(processed_change)

        return processed_changelogs

    def _format_comments(self, issue: RawIssueType) -> List[CommentType]:
        """Formats an issue's comments from raw Jira schema to Processed Jira data schema."""
        processed_comments = []

        fields = issue.get("fields", {})
        comments = fields.get("comment", {}).get("comments", [])

        for comment in comments:
            author = comment.get("author", {})

            processed_comment = comment_fields_map(issue, fields, author, comment)
            processed_comments.append(processed_comment)

        return processed_comments

    def _format_worklogs(self, issue: RawIssueType) -> List[WorklogType]:
        """Formats an issue's worklogs from raw Jira schema to Processed Jira data schema."""
        processed_worklogs = []

        fields = issue.get("fields", {})
        worklogs = fields.get("worklog", {}).get("worklogs", [])

        for worklog in worklogs:
            author = worklog.get("author", {})

            processed_worklog = worklog_fields_map(issue, fields, author, worklog)
            processed_worklogs.append(processed_worklog)

        return processed_worklogs

    def _replace_statuses(self, df: pd.DataFrame) -> pd.DataFrame:
        """Applies the status map to convert all of the statuses to a single common set."""
        df["status"] = df["status"].replace(status_map)
        return df

    def _duplicate_issues_for_all_assignees(self, issues_df: pd.DataFrame, changelogs_df: pd.DataFrame) -> pd.DataFrame:
        """
        Takes the set of issues and creates a new set where each issue is duplicated for each assignee
        that was ever assigned to the issue, just with the 'assigneeName' field updated.
        This is used to more accurately assess statistics about the types of tickets that people worked on,
        since it isn't always useful to rely on an issue's most recently assigned assignee.
        """
        assignee_changelogs = changelogs_df[changelogs_df["field"] == "assignee"]

        # Create a Series where the indices are the issue keys and the values are lists of assignee names
        assignees_per_ticket = (
            assignee_changelogs
                .groupby("issueKey")["from", "to"]
                .apply(lambda x: pd.unique(x.values.ravel()).tolist())
        )

        # Can't do anything with an empty set of assignee changelogs; will cause the next operation to fail
        if len(assignees_per_ticket) == 0:
            return issues_df

        # Convert the series of assignee names to a DataFrame that can be merged with the issues_df
        assignees_per_ticket_df = (
            assignees_per_ticket
                # Convert the values (i.e. the lists) to series -> this converts the whole thing to a DataFrame
                .apply(pd.Series)
                # Stack the indices from the series conversion into a multi-index -> this converts it back to a Series
                .stack()
                # Drop the indices from the multi-index since we don't need them
                .droplevel(1)
                # Convert it back to a DataFrame, with 'issueKey' as the index and 'assigneeName' as the column name
                .to_frame("assigneeName")
                # Convert the 'issueKey' from being the index to being a column
                .reset_index()
                # Rename the 'issueKey' column to match the 'key' column from the issues_df
                .rename(columns={"issueKey": "key"})
        )

        return (
            # Combine the all of the issue/assignee pairs with the issues_df
            pd.concat([issues_df, assignees_per_ticket_df], sort=True)
              # Sort the issues so that the issues with complete data (i.e. the ones from the original issues_df)
              # are sorted before the ones with missing data (i.e. the ones from assignees_per_ticket_df)
              .sort_values(["key", "id"])
              # Use the 'forward-fill' method to populate the new issue/assignee pairs with the correct data
              # from the original issues. The only inconsistent column is 'assigneeEmail',
              # so don't rely on it for filtering this DataFrame.
              .fillna(method="ffill")
              # Drop the duplicate pairs (duplicates happen since the assignees_per_ticket_df process generates
              # issue/assignee pairs that include the original pairs from issues_df)
              .drop_duplicates()
        )
