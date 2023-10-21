import {Entity,Column, PrimaryGeneratedColumn,
ManyToOne
} from 'typeorm';
import { User } from '../users/user.entity'

@Entity()
export class Report {

  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  price: number;

  @Column()
  make: string; // Hyundai

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  kilometer: number;
  
  @ManyToOne(() => User, (user) => user.reports)
  user: User
}
