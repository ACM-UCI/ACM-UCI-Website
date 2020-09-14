n,k = map(int, input().rstrip().split())

vals = list(map(int, input().rstrip().split()))
# It is guarenteed that the answer will always be one of the values in the array
# Thus you can sort and binary search over these values
sortedVals = sorted(vals)


# Greedily check the guess
# Assume 0-based indexing
# Add as many values greater than or equal to lim to the even-indices of the subsequence.
# Repeat for the odd-indices of the subsequence if it fails for the even-indices
def check(lim):
    is_even = True
    cnt = 0
    for v in vals:
        if is_even:
            # Only add the value to the even indices if it is greater than or equal to lim
            if v >= lim:
                cnt += 1
                is_even = not is_even
        else:
            # Automatically add the next value to the odd-indices to create more options for the even-indices
            cnt += 1
            is_even = not is_even

    if cnt >= k: return True

    # Repeat for the odd-indices
    is_odd = False
    cnt = 0
    for v in vals:
        if is_odd:
            if v >= lim:
                cnt += 1
                is_odd = not is_odd
        else:
            cnt += 1
            is_odd = not is_odd

    return cnt >= k

lo = 0
hi = n

while lo + 1 < hi:
    mid = (hi+lo)//2

    if check(sortedVals[mid]):
        lo = mid
    else:
        hi = mid

print(sortedVals[lo])