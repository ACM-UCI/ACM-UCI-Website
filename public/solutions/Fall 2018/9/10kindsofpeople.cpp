#include <iostream>
#include <string>
#include <vector>

using namespace std;

void getTree(int l[1000][1000], string arr[], int i, int j, long n, int r, int c);

int main(){
    int r,c;
    long n=0;
    cin >> r >> c;

    string arr[r];
    int l[1000][1000];
    string line;

    for(int i=0; i<r; i++){
        cin >> arr[i];
        for(int j=0; j<c; j++){
            l[i][j]=0;
        }
    }

    for(int i=0; i<r; i++){
        for(int j=0; j<c; j++){
            if(l[i][j]==0){
                n++;
                getTree(l, arr, i, j, n, r, c);
            }
        }
    }

    int num, a1, a2, b1, b2;
    cin >> num;
    for(int i=0; i<num; i++){
        cin >> a1 >> a2 >> b1 >> b2;
        if(l[a1-1][a2-1]==l[b1-1][b2-1]){
            if(arr[a1-1][a2-1]=='1'){
                cout << "decimal" << endl;
            }else{
                cout << "binary" << endl;
            }
        }else{
            cout << "neither" << endl;
        }
    }

    return 0;

}

void getTree(int l[1000][1000], string arr[], int i, int j, long n, int r, int c){
    if(l[i][j]==0){
        l[i][j]=n;
        if(i!=0){
            if(arr[i][j]==arr[i-1][j]){
                getTree(l, arr, i-1, j, n, r, c);
            }
        }
        if(i!=(r)-1){
            if(arr[i][j]==arr[i+1][j]){
                getTree(l, arr, i+1, j, n, r, c);
            }
        }
        if(j!=0){
            if(arr[i][j]==arr[i][j-1]){
                    getTree(l, arr, i, j-1, n, r, c);
            }
        }
        if(j!=c-1){
            if(arr[i][j]==arr[i][j+1]){
                    getTree(l, arr, i, j+1, n, r, c);
            }
        }
    }
}
