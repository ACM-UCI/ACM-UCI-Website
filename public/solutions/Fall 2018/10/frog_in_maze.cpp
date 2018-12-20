#include <bits/stdc++.h>

using namespace std;

int N,M,K;
pair<int,int> tunnels[22][22];
double p_esc = 0.0;
int a_i,a_j,d_i,d_j;
int grid[22][22] = {0};
double adj_mat[400][400] = {0.0};
double temp_mat[400][400] = {0.0};
double ans_mat[400][400] = {0.0};

vector<pair<int,int>> exits;

double p_death = 0.0;
int num_bombs = 0;

vector<pair<int,int>> get_next_spots(pair<int,int> loc){
    vector<pair<int,int>> result;
    if(loc.first != 0 && grid[loc.first-1][loc.second] != 300)
        result.push_back(pair<int,int>(loc.first-1,loc.second));
    if(loc.first+1 != N && grid[loc.first+1][loc.second] != 300)
        result.push_back(pair<int,int>(loc.first+1,loc.second));
    if(loc.second != 0 && grid[loc.first][loc.second-1] != 300)
        result.push_back(pair<int,int>(loc.first,loc.second-1));
    if(loc.second+1 != M && grid[loc.first][loc.second+1] != 300)
        result.push_back(pair<int,int>(loc.first,loc.second+1));
    if(result.size() == 0){ // if there are no valid moves from a location then essentially, it's a bomb...
        grid[loc.first][loc.second] = 200;
        ++num_bombs;
    }
    return result;
}



void mat_sq_in_pl(){
    for(int i=0;i<N*M;++i){
        for(int j=0;j<N*M;++j){
            temp_mat[i][j] = 0.0;
        }
    }
    for(int i=0;i<N*M;++i){
        for(int j=0;j<N*M;++j){
            for(int k=0;k<N*M;++k){
                temp_mat[i][j] += adj_mat[i][k] * adj_mat[k][j];
            }
        }
    }
    for(int i=0;i<N*M;++i){
        for(int j=0;j<N*M;++j){
            adj_mat[i][j]=temp_mat[i][j];
        }
    }
}

void print_adj_mat(){
    printf("\nAdj mat\n");
    for(int i=0;i<N*M;++i){
        for(int j=0;j<N*M;++j){
            printf("%5.3f ",adj_mat[i][j]);
        }
        printf("\n");
    }
}

int main()
{
    for(int i=0;i<22;++i){
        for(int j=0;j<22;++j){
            tunnels[i][j] = pair<int,int>(-1,-1);
        }
    }

    scanf("%d",&N);
    scanf("%d",&M);
    scanf("%d",&K);

    string dummy;
    getline(cin,dummy);

    for (int row_i = 0; row_i < N;++row_i) {
        string row;
        getline(cin, row);
        for (int col_j=0;col_j < M;++col_j) {
            if(row[col_j] == '#'){
                grid[row_i][col_j] = 300;
            }
            else if(row[col_j] == '*'){
                grid[row_i][col_j] = 200;
                ++num_bombs;
            }
            else if(row[col_j] == '%'){
                grid[row_i][col_j] = 100;
                exits.push_back(pair<int,int>(row_i,col_j));
            }
            else {
                grid[row_i][col_j] = 0;
            }
            if(row[col_j] == 'A'){
                a_i = row_i;
                a_j = col_j;
            }
        }
    }
    for (int k_itr = 0; k_itr < K; k_itr++) {
        int t1i,t1j,t2i,t2j;
        scanf("%d",&t1i);
        scanf("%d",&t1j);
        scanf("%d",&t2i);
        scanf("%d",&t2j);
        tunnels[t1i-1][t1j-1] = pair<int,int>(t2i-1,t2j-1);
        tunnels[t2i-1][t2j-1] = pair<int,int>(t1i-1,t1j-1);
    }

    for(int t=0;t<M*N;++t){
        int i = t/M;
        int j = t%M;
        if(grid[i][j] == 0){
            vector<pair<int,int>> reachable = get_next_spots(pair<int,int>(i,j));
            for(auto loc:reachable){
                if(tunnels[loc.first][loc.second] != pair<int,int>(-1,-1)){
                    loc = tunnels[loc.first][loc.second];
                }
                adj_mat[i*M+j][loc.first*M+loc.second] = 1.0/reachable.size();
            }
            if(reachable.size()==0){
                adj_mat[i*M+j][i*M+j] = 1.0;
            }
        }
        else if(grid[i][j] == 200 || grid[i][j] == 100){
            adj_mat[i*M+j][i*M+j] = 1.0;
        }
    }
    double former_p_esc = 0.0;
    for(int a=0;a<16;++a){
        mat_sq_in_pl();

        p_esc = 0.0;
        
        for(auto exit: exits){
            p_esc+=adj_mat[a_i*M+a_j][exit.first*M+exit.second];
        }
        if(a>5 && p_esc-former_p_esc<1e-7){
            break;
        }
        former_p_esc = p_esc;
    }

    printf("%.9f",p_esc);

    return 0;
}