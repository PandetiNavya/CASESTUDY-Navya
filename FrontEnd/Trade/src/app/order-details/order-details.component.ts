import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../model/item.model';
import { ItemdetailService } from '../services/itemdetail.service';
import { Item } from '../model/item.model';
import { UserService } from '../services/user.service';
import { User } from '../model/item.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order = {
    orderId: 0,
    itemId: 0,
    userId: 0,
    date: new Date(),
    shippingAddress: '',
    paymentMethod: '',
    status: ''
  };
  paymentMethods = ['Credit Card', 'Debit Card', 'PayPal'];
  status=['confirm','Not confirm'];
  constructor(
    private orderService: OrderService,
    private itemService: ItemdetailService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId !== null) {
      const parsedItemId = +itemId;
      this.itemService.getItemById(parsedItemId).subscribe(data => {
        this.order.userId=1;
        this.order.itemId = data.itemId;
        
      });
    }
    
    // Assuming you have a way to get the logged-in user
    this.userService.getLoggedInUser().subscribe(data => {
      
      this.order.userId = data.userId;
       // Assign logged-in user to the order
    });
  }

  placeOrder(): void{  
    if (this.order.status === 'Not confirm') {
      // Redirect back to the item details page
      this.router.navigate(['/item-details', this.order.itemId]);
    }else{
      console.log("order placed")
    this.orderService.placeOrder(this.order).subscribe((data) => {
      alert('Order placed successfully!');
      this.router.navigate(['/order-confirmation', data.orderId]);
    });
  }
  }
}
