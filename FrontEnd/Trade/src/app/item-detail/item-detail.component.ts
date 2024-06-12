import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemdetailService } from '../services/itemdetail.service';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item []=[];//| undefined;
  filteredItems: Item[] = [];
  searchTerm: string = '';
  constructor(
    private itemService: ItemdetailService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract item ID from the route parameters with a default value
   // const itemId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    
    // Fetch item details using the item service
   // if (itemId) {
      this.itemService.getAllItems().subscribe(
        data => {
          this.item = data;
        },
        error => {
          console.error('Error fetching item details', error);
        }
      );
    } 
  

  addToCart(itemId:number): void {
    // Redirect to order details form with item id
    if (this.item) {
      this.router.navigate(['/order-details', itemId]);
    }
  }

  filterItems(): void {
    // Filter items by name
    this.filteredItems = this.item.filter(item =>
      item.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
