import java.util.Scanner;
import java.util.Arrays;

public class Main {

    /**
     * Perform a greedy predicate check.
     * Assume 0-based indexing
     * Attempt to add as many values to the even-indices that are greater than or equal to lim.
     * Repeat for the odd-indices if it fails for the even-indices
     */
	static boolean check(int[] vals, int k, int lim) {
		boolean is_even = true;
		int cnt = 0;
		for (int i = 0; i < vals.length; ++i) {
			if (is_even) {
                // Only add the value to the even-index of the subsequence if it is greater than or equal to lim
				if (vals[i] >= lim) {
					++cnt;
					is_even = !is_even;
				}
			} else {
                // Automatically add the next available value to the odd-index of the subsequence as it will create more options for the even indices
				++cnt;
				is_even = !is_even;
			}
		}

		if (cnt >= k) return true;

        // repeat for the odd-indices
		boolean is_odd = false;
		cnt = 0;
		for (int i = 0; i < vals.length; ++i) {
			if (is_odd) {
				if (vals[i] >= lim) {
					++cnt; 
					is_odd = !is_odd;
				}
			} else {
				++cnt;
				is_odd = !is_odd;
			}
		}

		return cnt >= k;
	}


	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		int N = scan.nextInt();
		int K = scan.nextInt();

		int[] vals = new int[N];
		int[] sortedVals = new int[N];
		for (int i = 0; i < N; ++i) {
			sortedVals[i] = vals[i] = scan.nextInt();
		}

        // It is guarenteed that the answer will be one of the values in the array so you can sort and binary search over those values
		Arrays.sort(sortedVals);


		int lo = 0;
		int hi = N;
		while (lo + 1 < hi) {
			int mid = (lo + hi)/2;
			
			if (check(vals, K, sortedVals[mid])) {
				lo = mid;
			} else {
				hi = mid;
			}
		}

		System.out.println(sortedVals[lo]);

	}
}