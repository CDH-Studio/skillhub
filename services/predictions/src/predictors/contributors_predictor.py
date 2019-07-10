import joblib
import os
import pandas as pd
import sklearn
from config import CONTRIBUTORS_MODEL
from typing import Any, Dict, List, Union

RawIssueType = Dict[str, Any]
RawFieldType = Dict[str, Any]

IssueType = Dict[str, Union[str, int]]
ChangelogType = Dict[str, str]
CommentType = Dict[str, str]
WorklogType = Dict[str, Union[str, float]]

status_map = {
    "Prototyping (Discovery)": "In Progress",
    "Abandoned": "Done",
    "Closed": "Done",
    "Peer reviewing (Delivery)": "Review",
    "in QA": "Review",
    "Testing (Delivery)": "Review",
    "QA": "Review",
    "Developing (Delivery)": "In Progress",
    "On Hold": "To Do",
    "Parked": "To Do",
    "Tech review": "Review",
    "Released": "Done",
    "Code Complete": "Review",
    "Releasing": "Done",
    "Ready": "To Do",
    "Estimating (Delivery)": "To Do",
    "Draft": "To Do",
    "Resolved": "Done",
    "Open": "To Do",
    "Client Reviewed": "Review",
    "Delivery - Development": "In Progress",
    "Delivery - Peer Review": "Review",
    "Delivery - Ready": "Review",
    "Delivery - Testing": "Review",
    "Delivery - User Acceptance Testing (UAT)": "Review",
    "Development (Delivery)": "In Progress",
    "Discovery - Prototypes and Proof of Concepts": "In Progress",
    "Discovery - User Story Elaboration": "In Progress",
    "Discovery - Validation": "In Progress",
    "Hold": "In Progress",
    "In Review": "Review",
    "Peer Review (Delivery)": "Review",
    "Ready (Delivery)": "Review",
    "Ready for QA": "Review",
    "Reopened": "To do",
    "UAT": "Review",
    "UAT (Delivery)": "Review",
    "Under Review": "Review",
    "User Accept Testing": "Review",
    "Validating (Discovery)": "Review",
    "Validation (Discovery)": "Review",
    "Waiting for support": "In Progress",
    "To do": "To Do",
    "Escalated": "In Progress",
    "Release - Ready": "Review"
}


def issue_fields_map(issue: RawIssueType = {}, fields: RawFieldType = {}) -> IssueType:
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
    return {
        "created": change.get("created"),
        "issueId": issue.get("id"),
        "issueKey": issue.get("key"),
        "authorName": author.get("displayName"),
        "authorEmail": author.get("emailAddress"),
        "field": item.get("field"),
        "fieldType": item.get("fieldtype"),
        "from": item.get("fromString", ""),
        "to": item.get("toString"),
        "projectName": fields.get("project", {}).get("name"),
        "projectKey": fields.get("project", {}).get("key"),
        "assigneeName": fields.get("assignee", {}).get("displayName"),
        "assigneeEmail": fields.get("assignee", {}).get("emailAddress")
    }


def comment_fields_map(
    issue: RawIssueType = {},
    fields: RawFieldType = {},
    author: RawFieldType = {},
    comment: RawFieldType = {}
) -> CommentType:
    return {
        "id": comment.get("id"),
        "created": comment.get("created"),
        "issueId": issue.get("id"),
        "issueKey": issue.get("key"),
        "authorName": author.get("displayName"),
        "authorEmail": author.get("emailAddress"),
        "projectName": fields.get("project", {}).get("name"),
        "projectKey": fields.get("project", {}).get("key"),
        "body": comment.get("body")
    }


def worklog_fields_map(
    issue: RawIssueType = {},
    fields: RawFieldType = {},
    author: RawFieldType = {},
    worklog: RawFieldType = {}
) -> WorklogType:
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


def issue_features(issues: pd.DataFrame = pd.DataFrame()) -> pd.DataFrame:
    if len(issues) > 0:
        return {
            "ticket_count": len(issues),
            "bug_ticket_count": len(issues[issues["type"].str.contains("bug", case=False)]),
            "done_ticket_count": len(issues[issues["status"].str.contains("done", case=False)]),
            "high_priority_ticket_count": len(filter_high_priority_issues(issues))
        }
    else:
        return {
            "ticket_count": 0,
            "bug_ticket_count": 0,
            "done_ticket_count": 0,
            "high_priority_ticket_count": 0
        }


def issue_creator_features(issues: pd.DataFrame = pd.DataFrame()) -> pd.DataFrame:
    return {
        "creator_ticket_count": len(issues)
    }


def changelog_features(changelogs: pd.DataFrame = pd.DataFrame()) -> pd.DataFrame:
    if len(changelogs) > 0:
        return {
            "changelog_count": len(changelogs),
            "status_change_changelog_count": len(filter_status_change_changelogs(changelogs)),
        }
    else:
        return {
            "changelog_count": 0,
            "status_change_changelog_count": 0
        }


def comment_features(comments: pd.DataFrame = pd.DataFrame()) -> pd.DataFrame:
    return {
        "comment_count": len(comments)
    }


def worklog_features(worklogs: pd.DataFrame = pd.DataFrame()) -> pd.DataFrame:
    if len(worklogs) > 0:
        return {
            "time_spent": worklogs["timeSpent"].sum()
        }
    else:
        return {
            "time_spent": 0
        }

ISSUE_COLUMNS = list(issue_fields_map().keys())
CHANGELOG_COLUMNS = list(changelog_fields_map().keys())
COMMENT_COLUMNS = list(comment_fields_map().keys())
WORKLOG_COLUMNS = list(worklog_fields_map().keys())


class ContributorsPredictor:
    def __init__(self):
        self.model = joblib.load(CONTRIBUTORS_MODEL)

    def predict(self, raw_issues: List[RawIssueType]) -> Dict[str, bool]:
        processed_data = ProcessedJiraData(raw_issues)
        feature_vectors = processed_data.get_feature_vectors()
        predictions = self.model.predict(feature_vectors)

        results = feature_vectors
        results["prediction"] = predictions.astype(bool)

        results = results[["prediction"]]

        # Convert the multi-index of (projectKey, name) to a dict of {projectKey: {name: {prediction: bool}}}
        results_dict = {level: results.xs(level).to_dict("index") for level in results.index.levels[0]}
        return results_dict

    def raw_predict(self, feature_vectors: List[List[float]]) -> List[bool]:
        features_df = pd.DataFrame(feature_vectors)
        predictions = self.model.predict(features_df)

        return predictions.astype(bool).tolist()


class ProcessedJiraData:
    def __init__(self, raw_issues: List[RawIssueType]) -> None:
        self._process_data(raw_issues)

    def get_feature_vectors(self) -> pd.DataFrame:
        feature_mappings = [
            {
                "data": self.issues_with_all_assignees_df,
                "groupby": ["projectKey", "assigneeName"],
                "features": issue_features
            },
            {
                "data": self.issues_df,
                "groupby": ["projectKey", "creatorName"],
                "features": issue_creator_features
            },
            {
                "data": self.changelogs_df,
                "groupby": ["projectKey", "authorName"],
                "features": changelog_features
            },
            {
                "data": self.comments_df,
                "groupby": ["projectKey", "authorName"],
                "features": comment_features
            },
            {
                "data": self.worklogs_df,
                "groupby": ["projectKey", "authorName"],
                "features": worklog_features
            }
        ]

        raw_features = []
        all_columns = []

        for feature_mapping in feature_mappings:
            all_columns.extend(list(feature_mapping["features"]().keys()))

            # Perform the tranformation of raw data to features
            features = (
                feature_mapping["data"]
                    .groupby(feature_mapping["groupby"])
                    .apply(lambda df: pd.DataFrame(feature_mapping["features"](df), index=[0]))
            )

            if len(features) > 0:
                # Get rid of the extra index that is introduced from doing an 'apply' on a 'groupby'
                features = features.droplevel(-1)

                # Rename the second index so that it's consistent between all of the DataFrames
                features.index.levels[1].name = "name"

            raw_features.append(features)

        all_features = raw_features[0].join(raw_features[1:-1], how="outer").fillna(0)

        for column in all_columns:
            if column not in all_features.columns:
                all_features[column] = 0

        return aggregate_contribution_ratios(all_features)

    def _process_data(self, raw_issues: List[RawIssueType]) -> None:
        issues = []
        changelogs = []
        comments = []
        worklogs = []

        for issue in raw_issues:
            fields = issue.get("fields", {})

            # For some reason, when using `.get("...", {})`, these fields ignore the 'empty'
            # condition and it ends up just returning None instead of an empty object.
            # But it's _only_ these fields... ¯\_(ツ)_/¯
            # These statements just make sure they get set to empty objects if they're 'actually' empty
            fields["creator"] = fields["creator"] if fields["creator"] else {}
            fields["priority"] = fields["priority"] if fields["priority"] else {}
            fields["assignee"] = fields["assignee"] if fields["assignee"] else {}
            fields["resolution"] = fields["resolution"] if fields["resolution"] else {}

            issues.append(self._format_issue(issue))
            changelogs.extend(self._format_changelogs(issue))
            comments.extend(self._format_comments(issue))
            worklogs.extend(self._format_worklogs(issue))

        # Explicitly set the columns so that, even if there are 0 rows,
        # later operations still know the expected structure of the DataFrame
        self.issues_df = self._replace_statuses(pd.DataFrame(issues, columns=ISSUE_COLUMNS))
        self.changelogs_df = pd.DataFrame(changelogs, columns=CHANGELOG_COLUMNS)
        self.comments_df = pd.DataFrame(comments, columns=COMMENT_COLUMNS)
        self.worklogs_df = pd.DataFrame(worklogs, columns=WORKLOG_COLUMNS)

        self.issues_with_all_assignees_df = self._duplicate_issues_for_all_assignees(self.issues_df, self.changelogs_df)

    def _format_issue(self, issue: RawIssueType) -> IssueType:
        fields = issue.get("fields", {})
        return issue_fields_map(issue, fields)

    def _format_changelogs(self, issue: RawIssueType) -> List[ChangelogType]:
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
        processed_comments = []

        fields = issue.get("fields", {})
        comments = fields.get("comment", {}).get("comments", [])

        for comment in comments:
            author = comment.get("author", {})

            processed_comment = comment_fields_map(issue, fields, author, comment)
            processed_comments.append(processed_comment)

        return processed_comments

    def _format_worklogs(self, issue: RawIssueType) -> List[Dict[str, Union[str, float]]]:
        processed_worklogs = []

        fields = issue.get("fields", {})
        worklogs = fields.get("worklog", {}).get("worklogs", [])

        for worklog in worklogs:
            author = worklog.get("author", {})

            processed_worklog = worklog_fields_map(issue, fields, author, worklog)
            processed_worklogs.append(processed_worklog)

        return processed_worklogs

    def _replace_statuses(self, df: pd.DataFrame) -> pd.DataFrame:
        df["status"] = df["status"].replace(status_map)
        return df

    def _duplicate_issues_for_all_assignees(self, issues_df: pd.DataFrame, changelogs_df: pd.DataFrame) -> pd.DataFrame:
        # TODO: Modify to use emails instead of names since we use emails as identifiers 

        assignee_changelogs = changelogs_df[changelogs_df["field"] == "assignee"]

        # Create a Series where the indices are the issue keys and the values are lists of assignee names
        assignees_per_ticket = (
            assignee_changelogs
                .groupby("issueKey")["from", "to"]
                .apply(lambda x: pd.unique(x.values.ravel()).tolist())
        )

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
              # from the original issues. The only thing inconsistent is the 'assigneeEmail', so don't rely on it.
              .fillna(method="ffill")
              # Drop the duplicate pairs (duplicates happen since the assignees_per_ticket_df process generates
              # issue/assignee pairs that include the original pairs from issues_df)
              .drop_duplicates()
        )


def filter_high_priority_issues(df: pd.DataFrame) -> pd.Series:
    high_priority = (
        (df["priority"] == "High")
        | (df["priority"] == "Blocker")
        | (df["priority"] == "Major")
        | (df["priority"] == "Highest")
        | (df["priority"] == "Critical")
    )

    return df[high_priority]


def filter_status_change_changelogs(df: pd.DataFrame, status: str = "Done") -> pd.Series:
    changelogs_status_df = df[df["field"] == "status"]

    changelogs_status_df["from"] = changelogs_status_df["from"].replace(status_map)
    changelogs_status_df["to"] = changelogs_status_df["to"].replace(status_map)

    return changelogs_status_df[(changelogs_status_df["from"] == status) | (changelogs_status_df["to"] == status)]


def aggregate_contribution_ratios(df: pd.DataFrame) -> pd.DataFrame:
    for column in df:
        ratio_column = column + "_ratio"
        df[ratio_column] = df[column] / df.groupby(level=0)[column].sum()

    return df.fillna(0)
