# Contributing

Here are all of the steps you should follow whenever contributing to this repo!

## Making Changes

1. Before you start making changes, always switch to the `develop` branch, then `git pull` and `npm i` to make sure your code is up to date
2. Create a branch from `develop` using our [naming convention](#branch-naming): `git checkout -b <type>/<issue-number>-<short-description>`
3. Make changes to the code
4. `npm run lint` to ensure code standards. (running `npm run lint:fix` will fix most of the styling errors)

## Branch Naming

Name your branch `<type>/<issue-number>-<short-description>`, for example `feat/29-home-hero`.

- **type**: what kind of change this is (see the table below)
- **issue-number**: the issue you are working on, so anyone can tell what the branch is for. Leave it out only if there is no issue (e.g. `chore/update-readme`)
- **short-description**: 2 to 4 words, lowercase, separated by hyphens, no spaces

### Types

The same types are used at the start of your commit messages (`<type>: <description>`) and PR titles.

| Type       | Use it when you...                                                                                                                                                       | Example branch                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `feat`     | add something new that users or developers can see or use (a page, component, API route, feature)                                                                        | `feat/29-home-hero`            |
| `fix`      | fix a bug, something that was broken or behaved wrongly                                                                                                                  | `fix/33-menu-price-format`     |
| `docs`     | change only documentation (README, `docs/`, code comments)                                                                                                               | `docs/27-styling-guide`        |
| `style`    | change only code formatting with no behavior change (whitespace, semicolons, Prettier fixes). **Not** visual design: restyling a page with Tailwind is a `feat` or `fix` | `style/35-format-components`   |
| `refactor` | restructure or clean up code without changing what it does or adding features (rename, split a file, simplify)                                                           | `refactor/36-split-menu-api`   |
| `chore`    | do maintenance that is not app code (update dependencies, config, tooling, folder cleanup)                                                                               | `chore/31-update-dependencies` |

If your change fits more than one type, pick the one that describes the main purpose.

## Commiting Changes

When interacting with Git/GitHub, feel free to use the command line, VSCode extension, or Github desktop. These steps assume you have already made a branch using `git checkout -b <branch-name>` and you have made all neccessary code changes for the provided task.

1. View diffs of each file you changed using the VSCode Github extension (3rd icon on far left bar of VSCode) or GitHub Desktop
2. `git add .` (to stage all files) or `git add <file-name>` (to stage specific file)
3. `git commit -m "<type>[optional scope]: <description>"` or
   `git commit -m "<type>[optional scope]: <description>" -m "[optional body]"` or
   `git commit` to get a message prompt
4. `git push -u origin <name-of-branch>`

## Making Pull Requests

1. Go to the Pull Requests tab on [github.com](https://github.com/)
2. Find your PR, fill out the PR template
3. (If applicable, provide a screenshot of your work in the comment area)
4. Link your PR to the corresponding **Issue**
5. Request a reviewer to check your code
6. Once approved, your code is ready to be merged in 🎉
