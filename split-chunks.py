#!/usr/bin/env python3
"""chunks.json -> N groups (round-robin). Usage: python3 split-chunks.py [N] [chunks.json]"""
import json, sys

def main():
    path = sys.argv[2] if len(sys.argv) > 2 else 'chunks.json'
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 20
    with open(path) as f:
        chunks = json.load(f)
    groups = [[] for _ in range(n)]
    for i, c in enumerate(chunks):
        groups[i % n].append(c)
    groups = [g for g in groups if g]
    print(json.dumps({'group': groups}))

if __name__ == '__main__':
    main()
