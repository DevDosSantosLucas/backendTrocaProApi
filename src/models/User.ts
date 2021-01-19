import { Entity, Column, PrimaryGeneratedColumn, 
         OneToOne, JoinColumn ,
        } from 'typeorm';



import Item from './Item'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  whatsapp: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  avatar: string;

  @Column()
  password: string;


  @OneToOne(type=>Item, user=>User)
  @JoinColumn({name:'user_id'})
  item: Item;

}