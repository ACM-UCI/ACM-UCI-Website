class Solution(object):
    def firstMissingPositive(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        s_nums = set(nums)
        count = 1
        while True:
            if count in s_nums:
                count += 1
            else: return count