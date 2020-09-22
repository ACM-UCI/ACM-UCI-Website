from heapq import heappush, heappop
N = int(input())

total = last = time = 0
timeline = []

for i in range(N):
    s, e, t = map(int, input().split())
    # Python has a min-heap so to get EDF, ending should be first
    timeline.append((e, s, t))
    total += t
    last = max(last, e)

# Reverse sort by starting time (to pop off the earliest)
timeline.sort(key = lambda x : -x[1])

tasks = []
while timeline:

    # Push all tasks that arrived at this time
    time = timeline[-1][1]
    while timeline and timeline[-1][1] == time:
        heappush(tasks, timeline.pop())

    # The next arrival of a task
    event = timeline[-1][1] if timeline else last

    # while it's before the next arrival and the next task is not overdue
    while time < event and tasks and time < tasks[0][0]:
        e, s, t = heappop(tasks)
        # Work on the task until finished or until new task arrives
        spent = min(t, min(event, e) - time)
        time += spent
        t -= spent
        if t:
            heappush(tasks, (e, s, t));

print('f' if tasks else str(last - total))
