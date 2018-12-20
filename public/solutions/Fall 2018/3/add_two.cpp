#include <iostream>
using namespace std;
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int carry = 0;
        ListNode* sum = new ListNode(0);
        ListNode* head = sum;
        
        if (l1->val+l2->val+carry<10){
                cout<<l1->val+l2->val+carry;
                sum->val = l1->val+l2->val+carry;
                carry = 0;
        }
        else if(l1->val+l2->val+carry>=10){
              cout<<l1->val+l2->val-10;
                sum->val = l1->val+l2->val-10+carry;
                carry =1;
            }
        l1 = l1->next;
        l2 = l2->next;
        while(l1 &&l2){
            sum->next = new ListNode(0);
            sum = sum->next;
            if (l1->val+l2->val+carry<10){
                cout<<l1->val+l2->val+carry;
                sum->val = l1->val+l2->val+carry;
                carry = 0;
            }
            else if(l1->val+l2->val+carry>=10){
              cout<<l1->val+l2->val+carry;
                sum->val = l1->val+l2->val-10+carry;
                carry =1;
            }
            l1 = l1->next;
            l2 = l2->next;
        }
        if(l1){
            
            sum->next = new ListNode(0);
            sum = sum->next;
            if (l1->val+carry<10){
                cout<<l1->val+carry;
                sum->val = l1->val+carry;
                carry = 0;
            }
            else if(l1->val+carry>=10){
              cout<<l1->val+carry;
                sum->val = l1->val-10+carry;
                carry =1;
            }
            l1 = l1->next;
            while(l1){
                cout<<l1->val;
                sum->next = new ListNode(0);
                sum = sum->next;
                if (l1->val+carry<10){
                    cout<<l1->val+carry;
                    sum->val = l1->val+carry;
                    carry = 0;
                 }
                else if(l1->val+carry>=10){
                 cout<<l1->val+carry;
                sum->val = l1->val-10+carry;
                 carry =1;
            }
                l1 = l1->next;
            }
        }
        else if(l2){
            cout<<l2->val+carry;
            cout<<"it's here2";
            sum->next = new ListNode(0);
            sum = sum->next;
            if (l2->val+carry<10){
                cout<<l2->val+carry;
                sum->val = l2->val+carry;
                carry = 0;
            }
            else if(l2->val+carry>=10){
              cout<<l2->val+carry;
                sum->val = l2->val-10+carry;
                carry =1;
            }
            l2 = l2->next;
            while(l2){
                cout<<l2->val;
                sum->next = new ListNode(0);
                sum = sum->next;
                if (l2->val+carry<10){
                 cout<<l2->val+carry;
                    sum->val = l2->val+carry;
                    carry = 0;
                    l2 = l2->next;
                }
            else if(l2->val+carry>=10){
                cout<<l2->val+carry;
                    sum->val = l2->val-10+carry;
                    carry =1;
                    l2=l2->next;          
            }
        }
        }
        if(!l1 &&!l2 &&carry ==1){
            sum->next = new ListNode(1);
            
        }
    return head;
    }
};