# Version Control Using Git

## What is Git?

**Git** is an open-source distributed version control system that helps developers track changes in their code over time. Unlike centralized version control systems, Git gives every user a complete copy of the project repository, including its full history. This allows developers to work independently, commit changes locally, and later synchronize their work with a central repository.

## Features

- **Distributed Architecture**: Every developer has a full copy of the repository
- **Branching & Merging**: Create isolated branches for features and merge them seamlessly
- **Speed**: Most operations are performed locally, making Git extremely fast
- **Data Integrity**: Git uses SHA-1 hashing to ensure data integrity
- **Staging Area**: Review and organize changes before committing

## Essential Git Commands

### Basic Workflow
- `git add <file-name>` - Stage changes for commit
- `git commit -m "message"` - Commit staged changes with a descriptive message
- `git status` - Check the current state of your working directory

### Working with Remote Repositories
- `git push origin <branch-name>` - Push local commits to remote repository
- `git pull origin <branch-name>` - Fetch and merge changes from remote repository

### Branch Management
- `git checkout -b <branch-name>` - Create and switch to a new branch
- `git checkout <branch-name>` - Switch to an existing branch
- `git branch` - List all local branches

## Getting Started

To start using Git, initialize a repository in your project directory:

```bash
git init
```

Then configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```


**Note !! :** This project is fully created using ai for my learning purpose.
