import os, re

missing = []
with open('plan.md', 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip().startswith('- ['):
            match = re.search(r'`([^`]+)`', line)
            if match:
                filepath = match.group(1)
                # handle SpendAI_Project_Report.md matching CREDEX_AI_SPEND_AUDIT_PROJECT_REPORT.md
                if filepath == 'SpendAI_Project_Report.md':
                    filepath = 'CREDEX_AI_SPEND_AUDIT_PROJECT_REPORT.md'
                if not os.path.exists(filepath):
                    missing.append(filepath)

if missing:
    print('Missing files:')
    for m in missing: print(m)
else:
    print('All files exist!')
