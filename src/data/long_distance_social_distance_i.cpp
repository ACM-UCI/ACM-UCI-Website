#include <iostream>

int main() {

    int T,N;
    std::cin >> T;
    while (T--) {
        std::cin >> N;
        std::cout << 6*(N/2) + 4*(N%2) << std::endl;
    }
    
    return 0;
}