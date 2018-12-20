class Solution:
    def reverseBetween(self, head, m, n):
        """
        :type head: ListNode
        :type m: int
        :type n: int
        :rtype: ListNode
        """
        
        
        curr = head
        prev = ListNode(0)
        start = prev
        prev.next = head

        for _ in range(m - 1):
            curr = curr.next
            prev = prev.next

        for _ in range(n - m):
            temp = curr.next
            curr.next = temp.next
            temp.next = prev.next
            prev.next = temp
                
        return start.next