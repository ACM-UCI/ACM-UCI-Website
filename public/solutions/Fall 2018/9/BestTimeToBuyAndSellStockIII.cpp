//https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int min_so_far = 0x0f0f0f0f;
        int max_return = 0;
        int profit = 0;
        vector<int> front(prices.size(), 0);

        for (int i = 0; i < prices.size(); ++i) {
            min_so_far = min(prices[i], min_so_far);
            profit = max(profit, prices[i] - min_so_far);
            front[i] = profit;
        }
        int max_so_far = 0 ;
        for (int i = prices.size() - 1; i > 0; --i) {
            max_so_far = max(max_so_far, prices[i]);
            max_return = max(max_return, front[i] + max_so_far - prices[i]);
        }
        return max_return;
    }
};
