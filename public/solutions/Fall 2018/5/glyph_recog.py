import math

n = int(input())
pts = []

for i in range(n):
    x,y = map(int,input().strip().split())
    pts.append((x,y))
    
def gen_vertices(sides, pos_leg):
    vertices = [(pos_leg,0)]
    jmp = 2*math.pi/sides
    cur = jmp
    while 2*math.pi-cur > 10**-7:
        vertices.append((pos_leg*math.cos(cur),pos_leg*math.sin(cur)))
        cur += jmp
    return vertices

pts_dist = lambda a,b: ((b[1]-a[1])**2+(b[0]-a[0])**2)**0.5
    
def tri_area(tri):
    a = pts_dist(tri[0],tri[1])
    b = pts_dist(tri[1],tri[2])
    c = pts_dist(tri[0],tri[2])
    s = (a+b+c)/2.0
    return (s*(s-a)*(s-b)*(s-c))**0.5
    
def triangle_contained(tri,pt):
    pt_pairs = [(0,1),(1,2),(0,2)]
    pt_area = 0
    for v1,v2 in pt_pairs:
        pt_area+=tri_area([pt,tri[v1],tri[v2]])
    return abs(pt_area - tri_area(tri)) < 10**-3
        
def contained(n,radii,pt):
    pt_angle = (math.atan2(pt[1],pt[0])%(2*math.pi))
    cw_vert = int(pt_angle//(2*math.pi/n))
    pt_dist_to_cent = pts_dist((0,0),pt)
    vert_angle = 2*math.pi/n*cw_vert
    opp_angle = math.pi*(n-2)/(2*n)
    angle_diff = pt_angle-vert_angle
    remaining_angle = math.pi-angle_diff-opp_angle    
    return math.sin(opp_angle)*radii>=pt_dist_to_cent*math.sin(remaining_angle)
    
def poly_area(sides,rad):
    return 0.5*rad**2*sides*math.sin(2*math.pi/sides)

def bs_outer(beg,end,err,sides,pts):
    mid = lambda : (beg+end)/2.0
    while end-beg > err:
        if all([contained(sides,mid(),pt) for pt in pts]):
            end = mid()
        else:
            beg = mid()
    return mid()
    
def bs_inner(beg,end,err,sides,pts):
    mid = lambda : (beg+end)/2.0
    while end-beg > err:
        if any([contained(sides,mid(),pt) for pt in pts]):
            end = mid()
        else:
            beg = mid()
    return mid()

high_score = (0,0)

for num_sides in range(3,9):
    outer_radii = bs_outer(0,10**7,10**-8,num_sides,pts)
    inner_radii = bs_inner(0,10**7,10**-8,num_sides,pts)
    
    score = poly_area(num_sides,inner_radii)/poly_area(num_sides,outer_radii)
    if score > high_score[0]:
        high_score = (score,num_sides)
        
print(high_score[1],high_score[0])