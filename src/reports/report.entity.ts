import {Entity,Column, PrimaryGeneratedColumn } from 'typeorm';


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
  
}
