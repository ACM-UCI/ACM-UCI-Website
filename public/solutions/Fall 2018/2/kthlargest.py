class KthLargest:

    def __init__(self, k, nums):
        """
        :type k: int
        :type nums: List[int]
        """
        self.index =k
        nums.sort()
        self.nums = nums
       

    def add(self, val):
        """
        :type val: int
        :rtype: int
        """
        max = len(self.nums)-1
        min =0
        while(max>=min):
            mid = int(min+ (max-min)/2)
            if val<self.nums[mid]:
                max = mid-1
            elif (val>self.nums[mid]):
                min =mid+1
            else:
                self.nums[mid:mid]=[val]
                return self.nums[len(self.nums)-self.index]
        
        self.nums[min:min] = [val]
        return self.nums[len(self.nums)-self.index]