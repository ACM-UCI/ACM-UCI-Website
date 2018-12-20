# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution(object):
    def flatten(self, root):
        """
        :type root: TreeNode
        :rtype: void Do not return anything, modify root in-place instead.
        """
        stack = []
        if root:
            if root.right:
                stack.append(root.right)
            if root.left:
                stack.append(root.left)
            curr = root

            while stack:
                temp = stack.pop()
                curr.right = temp
                curr.left = None

                if temp:
                    if temp.right:
                        stack.append(temp.right)
                    if temp.left:
                        stack.append(temp.left)

                curr = temp