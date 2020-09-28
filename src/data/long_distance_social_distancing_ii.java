import java.io.*;
import java.util.*;

public class Solution {
    public static long mod = 1000000007;

    public static long[][] matmul(long[][] a, long[][] b) {
        long[][] c = new long[5][5];
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                c[i][j] = 0;
                for (int k = 0; k < 5; k++) {
                    c[i][j] += (a[i][k] * b[k][j]) % mod;
                    c[i][j] %= mod;
                }
            }
        }
        return c;
    }

    public static long[] matmul(long[][] a, long[] b) {
        long[] c = new long[5];
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                c[i] += (a[i][j] * b[i]) % mod;
                c[i] %= mod;
            }
        }
        return c;
    }

    public static long[][] pow(long[][] mat, long p) {
        if (p == 0)
            return new long[][]{{1, 0, 0, 0, 0}, {0, 1, 0, 0, 0}, {0, 0, 1, 0, 0}, {0, 0, 0, 1, 0}, {0, 0, 0, 0, 1}};
        long[][] temp = pow(mat, p / 2);
        if (p % 2 == 0) {
            return matmul(temp, temp);
        }
        return matmul(matmul(temp, temp), mat);
    }

    public static long solve(long t) {
        if (t == 0) return 1;
        long[][] init = new long[][]{
                {1, 1, 1, 1, 1},
                {1, 0, 1, 1, 0},
                {1, 1, 0, 1, 1},
                {1, 1, 1, 0, 0},
                {1, 0, 1, 0, 0}
        };
        long[][] result = pow(init, t - 1);
        long[] lastRow = matmul(result, new long[]{1, 1, 1, 1, 1});
        long s = 0;
        for (int i = 0; i < 5; i++) {
            s += lastRow[i];
            s %= mod;
        }
        return (s * s) % mod;
    }

    public static void main(String[] args) throws Throwable {
        /**
         * This is the most direct way of implementing the algorithm described. You can optimize by caching some of the exponentiation 
         * between each test case and by doing matrix multiplication in place.
         */
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        long t = Integer.parseInt(reader.readLine());
        for (int i = 0; i < t; i++) System.out.println(solve(Long.parseLong(reader.readLine())));
        reader.close();
    }
}