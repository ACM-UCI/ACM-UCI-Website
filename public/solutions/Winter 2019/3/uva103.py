###   UVA #103 : Stacking Boxes
###   Labels   : longest increasing subsequence

import sys

for line in sys.stdin:
    k,n = [int(x) for x in line.split()]
    
    # sort according to dimensions
    # last element in boxes will be base-1 index from original sequence
    boxes = sorted([sorted([int(x) for x in input().split()]) + [i+1] for i in range(k)])
    sequences = []
    longest_sequence = []
    
    
    # calculate longest increasing subsequence for each box
    for i in range(k):
        
        # will contain list of indexes of increasing boxes up to this box
        sequences.append([ " " + str(boxes[i][-1])])
        
        for j in range(i):
            if len(sequences[-1])-2 < len(sequences[j]):
                for k in range(n):
                    if boxes[j][k] >= boxes[i][k]: break
                else:
                    sequences[-1] = list(sequences[j]) + [sequences[-1][-1]]
        
        if len(sequences[-1]) > len(longest_sequence):
            longest_sequence = list(sequences[-1])
    
    box_indexes = "".join(longest_sequence)
    print(str(len(longest_sequence)) + '\n' + box_indexes[1:])
    