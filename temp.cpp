//// Author : shreyansh28801 
typedef unsigned long long ull;
typedef long int li;
#define int long long int
typedef long double ld;
#define lb lower_bound 
#define ub upper_bound 
#define pub push_back
#define pob pop_back
#define nl "\n"
typedef long double ld;


template <typename T>
istream &operator>>(istream &input, vector<T> &v) {
    for (auto &i : v) cin >> i;
    return input;
}


template <typename T>
ostream &operator<<(ostream &output, vector<T> &v) {
    for (auto &i : v) cout << i<<" ";
    return output;
}


//Definition of custom hash function to avoid collision in malicious test-cases (aka hacked test-cases)

struct cstH {
    static uint64_t splitmix64(uint64_t x) {
        // http://xorshift.di.unimi.it/splitmix64.c
        x += 0x9e3779b97f4a7c15;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
        return x ^ (x >> 31);
    }
    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + FIXED_RANDOM);
    }
};

//Now we can simply define our unordered_map or our gp_hash_table as follows:
//unordered_map<long long, int, cstH> safe_map;
//gp_hash_table<long long, int, cstH> safe_hashtable;

int M=1e9+7;

/*

const int N = 1e6+10 ;
vector<ll> A(N) ;


*/
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

bool chk(string& a,string &b){
    bool ans=a.size()==b.size();
    if(!ans)return false;

    ll ct-0;
    for (ll i = 0; i < a.size(); i++)
    {
        if(a[i]!=b[i])ct++;
    }
    return ct<=1;   
    
}

void solve(){
    int n;
    cin>>n;
    vector<string> start,fin;
    for (ll i = 0; i < n; i++)
    {
        string temp;
        cin>>temp;
        start.push_back(temp);
    }
    int m;
    cin>>m;
    for (ll i = 0; i < m; i++)
    {
        string temp;
        cin>>temp;
        fin.push_back(temp);
    }
    


    for(auto &str:fin){
        bool fl=0;
        for(auto &temp:start){
            if(chk(str,temp)){
                fl=1;
                cout<<"YES\n";
                break;
            }
        }
        if(fl=0)cout<<"NO\n";
    }

}
int32_t main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    /*
    const int N_local = 1e5;
    vector<ll> v(N_local);
    */ 
    int t;
    t=1;
    // cin>>t;
    while(t--)
    {
        solve();
    }
    return 0;
}