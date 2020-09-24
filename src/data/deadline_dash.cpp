#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct Task {
    int s, e, t;
    bool operator<(Task j) { return s < j.s; }
};

struct EDFComp {
    // For earliest deadline in the priority queue
    bool operator()(Task j1, Task j2) { return j1.e > j2.e; }
};

int main() {
    int N;
    cin >> N;

    vector<Task> timeline;
    int total = 0, last = 0, time = 0;
    while (N--) {
        int s, e, t;
        cin >> s >> e >> t;
        timeline.push_back({s, e, t});
        total += t, last = max(last, e);
    }

    // Sort by starting time
    sort(timeline.begin(), timeline.end());
    priority_queue<Task, vector<Task>, EDFComp> runqueue;
    auto next = timeline.begin();

    while (next != timeline.end()) {

        // Push all tasks that arrived at this time
        time = next->s;
        while (next != timeline.end() && next->s == time)
            runqueue.push(*(next++));

        // The next arrival of a task
        int event = next == timeline.end() ? last : next->s;

        while (time < event && !runqueue.empty() && time < runqueue.top().e) {
            Task task = runqueue.top();
            runqueue.pop();
            // Work on the task until finished or until new task arrives
            int spent = min(task.t, min(event, task.e) - time);
            time += spent;
            if (task.t -= spent)
                runqueue.push(task);
        }
    }


    if (runqueue.empty())
        cout << (last - total) << '\n';
    else
        cout << "f\n";
}
