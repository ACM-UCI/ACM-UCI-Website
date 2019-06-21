import json

f = open("acmdata.json")
data = json.loads(f.read())
f.close()

quarters = ["Fall 2018", "Winter 2019", "Spring 2019"]

d = {}
ct = 0

q = {}

for key in data['submissions']:
    k = key
    if k in d:
        while ct in d: ct+=1
        k = ct
    
    d[k] = {}

    d[k]["Category"] = ""
    d[k]["Code"] = data['submissions'][key]["Code"]
    d[k]["Contributor"] = [data['submissions'][key]["Contributor"]]
    d[k]["Difficulty"] = data['submissions'][key]["Difficulty"]
    d[k]["Link"] = data['submissions'][key]["Link"]
    d[k]["Name"] = data['submissions'][key]["Name"]
    d[k]["Note"] = data['submissions'][key]["Note"]
    d[k]["Session"] = []
    d[k]["Solution"] = data['submissions'][key]["Solution"]
    try:
        d[k]["SubmitDate"] = data['submissions'][key]["SubmitDate"]
    except:
        pass
    

for quarter in quarters:
    q[quarter] = {}
    for week in range(1,12):
        q[quarter][week] = [None, {},{}]

        if(isinstance(data[quarter][week],dict)):
            for key in data[quarter][week]:
                k = key
                if k in d:
                    while ct in d: ct+=1
                    k = ct
                
                d[k] = {}

                d[k]["Category"] = ""
                d[k]["Code"] = data[quarter][week][key]["Code"]
                d[k]["Contributor"] = [data[quarter][week][key]["Contributor"]]
                d[k]["Difficulty"] = data[quarter][week][key]["Difficulty"]
                d[k]["Link"] = data[quarter][week][key]["Link"]
                d[k]["Name"] = data[quarter][week][key]["Name"]
                d[k]["Note"] = data[quarter][week][key]["Note"]
                d[k]["Session"] = [quarter + "/" + str(week) + "/" + data[quarter][week][key]["Session"]]
                d[k]["Solution"] = data[quarter][week][key]["Solution"]
                try:
                    d[k]["SubmitDate"] = data[quarter][week][key]["SubmitDate"]
                except:
                    pass

                q[quarter][week][int(data[quarter][week][key]["Session"])][k] = {"tag":""}
        else:
            for key in range(len(data[quarter][week])):
                if key!=data[quarter][week][key]!=None:
                    k = key
                    if k in d:
                        while ct in d: ct+=1
                        k = ct
                    
                    d[k] = {}

                    d[k]["Category"] = ""
                    d[k]["Code"] = data[quarter][week][key]["Code"]
                    d[k]["Contributor"] = [data[quarter][week][key]["Contributor"]]
                    d[k]["Difficulty"] = data[quarter][week][key]["Difficulty"]
                    d[k]["Link"] = data[quarter][week][key]["Link"]
                    d[k]["Name"] = data[quarter][week][key]["Name"]
                    d[k]["Note"] = data[quarter][week][key]["Note"]
                    d[k]["Session"] = [quarter + "/" + str(week) + "/" + data[quarter][week][key]["Session"]]
                    d[k]["Solution"] = data[quarter][week][key]["Solution"]
                    try:
                        d[k]["SubmitDate"] = data[quarter][week][key]["SubmitDate"]
                    except:
                        pass

                    q[quarter][week][int(data[quarter][week][key]["Session"])][k] = {"tag":""}


f = open("d.json",'w')
f.write(json.dumps(d,indent=4))
f.close()

f = open("q.json",'w')
f.write(json.dumps(q,indent=4))
f.close()