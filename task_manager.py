import argparse
import base64
import json
from pathlib import Path

DATA_FILE = Path('tasks.json')

def load_tasks():
    if DATA_FILE.exists():
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_tasks(tasks):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, indent=2)

def add_task(title, description, attachment_path=None):
    tasks = load_tasks()
    task = {'title': title, 'description': description}
    if attachment_path:
        with open(attachment_path, 'rb') as f:
            encoded = base64.b64encode(f.read()).decode('ascii')
        task['attachment'] = encoded
    tasks.append(task)
    save_tasks(tasks)


def list_tasks():
    tasks = load_tasks()
    for idx, t in enumerate(tasks, 1):
        has_attachment = 'attachment' in t
        print(f"{idx}. {t['title']} - {t['description']}" + (" [attachment]" if has_attachment else ""))


def main():
    parser = argparse.ArgumentParser(description='Simple task manager with binary attachment support')
    subparsers = parser.add_subparsers(dest='command')

    add_p = subparsers.add_parser('add', help='Add a new task')
    add_p.add_argument('title')
    add_p.add_argument('description')
    add_p.add_argument('--attach', help='Path to binary file to attach')

    subparsers.add_parser('list', help='List tasks')

    args = parser.parse_args()

    if args.command == 'add':
        add_task(args.title, args.description, args.attach)
        print('Task added. Binary attachments supported.')
    elif args.command == 'list':
        list_tasks()
    else:
        parser.print_help()

if __name__ == '__main__':
    main()
