//https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int min_so_far = 0x0f0f0f0f;
        int profit = 0;
        for (auto price : prices) {
            int profit_today = price - min_so_far;
            profit = max(profit, profit_today);
            min_so_far = min(min_so_far, price);
        }
        return profit;
    }
};
