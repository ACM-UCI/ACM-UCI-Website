'''The first line of the input gives the number of test cases, T.
T test cases follow. Each test case consists of two lines. The first line of a
test case contains a single integer N, the total number of kids in the class.
The second line of a test case contains N integers F1, F2, ...,
FN, where Fi is the student ID number of the BFF of the kid with student ID i.
'''
import sys
sys.setrecursionlimit(5000)
open_file = open(input())
num_test = int(open_file.readline())

def store(open_file,friend_map):
    num = int(open_file.readline().strip())
    for index,i in enumerate(open_file.readline().strip().split(),1):
        to_int = int(i)
        if index not in friend_map:
            friend_map[index] = {'ind':set(),'outd': 0, 'len':1}
        friend_map[index]['outd'] = to_int
        if to_int not in friend_map:
            friend_map[to_int] = {'ind':set([index]),'outd':0,'len':1}
        else:
            friend_map[to_int]['ind'].add(index);
    return num

def process(friend:dict,traveled:set, number:int):
    clargest= 0
    nclargest = 0
    #addable = 0
    for to_tra in range(1,number + 1):
        if to_tra not in traveled:
            cycle_queue = []
            index = 0
            cyclic = False
            while(to_tra != friend[friend[to_tra]['outd']]['outd']):
                if to_tra in cycle_queue:
                    for n,i in enumerate(cycle_queue,0):
                        if to_tra == i:
                            index = n
                            break
                    cycle_queue = cycle_queue[index:]
                    cyclic = True
                    break
                cycle_queue.append(to_tra)
                to_tra = friend[to_tra]['outd'] #find the reciprocal node to start
            if cyclic:
                component = len(cycle_queue)
                cyclic_recur(friend, cycle_queue[0], traveled)
                if clargest < component:
                    clargest = component
            else:
                a = find_num(friend,to_tra,0,traveled)
                b = find_num(friend,friend[to_tra]['outd'],0,traveled)
                component = a + b
                nclargest += component
            
    return (clargest,nclargest)
            
def cyclic_recur(friend:dict, to_recur:int, traveled:set):
    if friend[to_recur]['ind'] == set():
        traveled.add(to_recur)
        return
    for i in friend[to_recur]['ind']:
        if i not in traveled:
            traveled.add(i)
            cyclic_recur(friend, i , traveled)
    
def find_num(friend: dict, to_recur: int,lar:int,traveled:set):
    if friend[to_recur]['ind'] == set():
        traveled.add(to_recur)
        return 1
    lolar = 0
    for i in friend[to_recur]['ind']:
        traveled.add(i)
        if i == friend[to_recur]['outd']:
            cmp = 0
        else:
            cmp = find_num(friend, i , lar, traveled)
        if cmp > lolar:
            lolar = cmp
    return lolar+1

if __name__ == '__main__':
    for _ in range(num_test):
        largest = 1
        friend_map = dict()
        traveled= set()
        num = store(open_file,friend_map)
        clargest,nclargest = process(friend_map, traveled, num)
        if nclargest  > clargest:
            largest = nclargest
        else:
            largest = clargest
        print("Case #" + str(_+1)+ ': ' + str(largest))
    open_file.close()
