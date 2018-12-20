// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> result(2,-1);
        int low = 0, high = nums.size() - 1;
        if (nums.size() == 0)
            return result;
        while (low < high)
        {
            int mid = (high+low) / 2;
            if (nums[mid] < target)
                low = mid + 1;
            else
                high = mid;
        }
        if (nums[low] == target)
            result[0] = low;
        else
            return result;
        high = nums.size() - 1;
        while (low < high)
        {
            int mid = (high + low) / 2 ;
            if (nums[mid] < target)
                low = mid + 1;
            else
                high = mid;
        }
        if (nums[low] == target)
            result[1] = low;
        else
            result[1] = result[0];
        return result;
    }
};
