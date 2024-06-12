import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/item.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    userId: 0,
    username: '',
    email: '',
    password: '',
    phoneNumber: 0,
    address: ''
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe((data: User) => {
      this.user = data;
    });
  }
  


  editUser(): void {
    // Navigate to the edit user page, passing the user ID as a parameter
    this.router.navigate(['/edit-user', this.user.userId]);
  }

  goBack(): void {
    // Navigate back to the previous page
    this.router.navigate(['/item-details']);
  }
}
