
# How to Contribute

Before you contribute, there are a few things you need to know below.

## Code of Conduct

We has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it.
Please read [the full text](https://github.com/square-gaming/diatopia-server/blob/master/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Branch Strategy

### The main branches

At the core, the development model is greatly inspired by existing models out there.
The central repo holds two main branches with an infinite lifetime:

* master
* develop

The master branch at origin should be familiar to every Git user. Parallel to the master branch, another branch exists called develop.
We consider origin/master to be the main branch where the source code of HEAD always reflects a stable state.

When the source code in the develop branch reaches a stable point, all of the changes should be merged back into master somehow and then tagged with a release number.
How this is done in detail will be discussed further on.

### Supporting branches

Next to the main branches master and develop, our development model uses supporting branches to aid parallel development between team members, ease tracking of features.
Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.

The different types of branches we may use are:

* Feature branches
* Hotfix branches

#### Feature branches

May branch off from:
* develop

Must merge back into:
* develop

The essence of a feature branch is that it exists as long as the feature is in development, but will eventually be merged back into develop (to definitely add the new feature to the upcoming release) or discarded (in case of a disappointing experiment).

Feature branches typically exist in developer repos only, not in origin.

#### Hotfix branches

May branch off from:
*master

Must merge back into:
* develop
* master

Branch naming convention:
* hotfix-*

When a critical bug in a production version must be resolved immediately, a hotfix branch may be branched off from the corresponding tag on the master branch that marks the production version.

If you would like to learn more about complete branch model, please check Vincent Driessen's [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

## Code Style Guide

We use an automatic code formatter [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run the formatter after making any changes to the code.

Then, our linter will catch most issues that may exist in your code.

However, there are still some styles that the linter cannot pick up.
If you are unsure about something, looking at [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) will guide you in the right direction.

## Commit Convention Guide

We use conventional commit, which is a lightweight convention on top of commit messages.

The commit message should be structured as follows:
```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```
The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. fix: a commit of the type fix patches a bug in your codebase (this correlates with [PATCH](http://semver.org/#summary) in semantic versioning).
2. feat: a commit of the type feat introduces a new feature to the codebase (this correlates with [MINOR](http://semver.org/#summary) in semantic versioning).
3. BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with [MAJOR](http://semver.org/#summary in semantic versioning)). A BREAKING CHANGE can be part of commits of any type.
4. types other than fix: and feat: are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the [the Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
5. footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

Additional types are not mandated by the Conventional Commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE). A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., feat(parser): add ability to parse arrays.

## Semantic Versioning

We follow [semantic versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. 
