import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int T = scan.nextInt();
        while(T-- > 0) {
            int N = scan.nextInt();
            System.out.println((N/2)*6 + 4*(N%2));
        }
    }
}