import { Entity, Column, PrimaryGeneratedColumn, AfterInsert,AfterRemove,AfterUpdate,
  OneToMany

} from "typeorm";
import { Report } from "../reports/report.entity";


console.log('Report Entity:',Report);

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // 함수로 타입을 래핑하는 이유는 순환 종속성 이슈를 막기 위함이다
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]
  
  @Column({ default: true}) //TODO: default value 수정
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id ${this.id}`);
  }
}