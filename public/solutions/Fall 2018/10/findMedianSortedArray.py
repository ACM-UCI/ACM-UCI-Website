#https://leetcode.com/problems/median-of-two-sorted-arrays/
class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: float
        """
        len1=len(nums1)
        len2=len(nums2)
        combined =[]    
        i =0
        j=0
        while(i<len1 and j<len2):
            if nums1[i]<nums2[j]:
                combined.append(nums1[i])
                i+=1
            else:
                combined.append(nums2[j])
                j+=1
        while(i<len1):
            combined.append(nums1[i])
            i+=1
        while(j<len2):
            combined.append(nums2[j])
            j+=1
        if (len1+len2)%2==0:
            print(int(len(combined)/2))
            print(int(len(combined)/2-1))
            return (combined[int(len(combined)/2)]+combined[int(len(combined)/2-1)])/2
        else:
            return combined[int(len(combined)/2)]