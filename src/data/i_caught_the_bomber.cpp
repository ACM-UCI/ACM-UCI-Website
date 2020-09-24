#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;
int main() {
    int N, M;
    cin >> N >> M;
    unordered_set<string> schools;
    string school, address;
    while (M--) {
        cin >> school;
        schools.insert(school+".edu");
    }
    while (N--) {
        cin >> address;
        string domain = address.substr(address.find("@")+1);
        if (!schools.count(domain))
            cout << address << '\n';
    }
}
