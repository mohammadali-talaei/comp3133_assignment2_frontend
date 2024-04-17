// view-employee.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

interface Employee {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  salary: number;
}

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: String!) {
    getEmployeeById(_id: $id) {
      _id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    // Grab the ID from the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchEmployeeById(id);
    }
  }

  fetchEmployeeById(id: string): void {
    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id }
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      if (errors) {
        console.error('Error fetching employee:', errors);
        return;
      }

      if (!loading && data) {
        this.employee = data.getEmployeeById;
      }
    });
  }
}
