class Solution:
    def canCompleteCircuit(self, gas, cost):
        """
        :type gas: List[int]
        :type cost: List[int]
        :rtype: int
        """
        begin = len(gas)-1
        finish = 0
        
        total = gas[begin]-cost[begin]
        while(begin>finish):
            if(total>=0):
                total+=gas[finish]-cost[finish]
                finish+=1
            else:
                begin-=1
                total+=gas[begin] -cost[begin]
                
        if total>=0:
            return begin
        else:
            return -1