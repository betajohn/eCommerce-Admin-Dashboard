# Git notes and tricks

## reset to last commit (head)

```git
git reset --hard HEAD
```

## The Anatomy of a Commit Message

- Basic

```git
git commit -m <message>
```

- Detailed

```git
git commit -m <title> -m <description>
```

## Write Better Commit Messages

- Capitalize the first word and do not end in punctuation.

- Use imperative mood in the subject line

```text
Add fix for dark mode toggle state
```

- Specify the type of commit: have a consistent set of words to describe your changes. (see conventional commits bellow)

- The first line should ideally be no longer than 50 characters, and the body should be restricted to 72 characters.

- Be direct.

## Conventional Commits

Conventional Commit is a formatting convention that provides a set of rules to formulate a consistent commit message structure like so.

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The commit type can include the following:

- **feat** – a new feature is introduced with the changes
- **fix** – a bug fix has occurred
- **chore** – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- **refactor** – refactored code that neither fixes a bug nor adds a feature
- **docs** – updates to documentation such as a the README or other markdown files
- **style** – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
- **test** – including new or correcting previous tests
- **perf** – performance improvements
- **ci** – continuous integration related
- **build** – changes that affect the build system or external dependencies
- **revert** – reverts a previous commit

The commit **type subject** line should be all lowercase with a character limit to encourage succinct descriptions.

The optional **commit body** should be used to provide further detail that cannot fit within the character limitations of the subject line description.

It is also a good location to utilize `tetxt BREAKING CHANGE: <description>` to note the reason for a breaking change within the commit.

The **footer** is also optional. We use the footer to link the JIRA story that would be closed with these changes for example: Closes D2IQ-<JIRA #> .

### Full Conventional Commit Example

```text
fix: fix foo to enable bar

This fixes the broken behavior of the component by doing xyz.

BREAKING CHANGE
Before this fix foo wasn't enabled at all, behavior changes from <old> to <new>

Closes D2IQ-12345
```
