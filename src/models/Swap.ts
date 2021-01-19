import { Entity, Column, PrimaryGeneratedColumn,  JoinColumn, OneToOne } from 'typeorm';

import Item from './Item';

@Entity('swaps')
export default class Swap {

  @PrimaryGeneratedColumn('uuid')
  swap_id: string; 

  @OneToOne(type=> Item,swaps=> Swap)
  @JoinColumn({name: 'item_id'})
  item_id: Item;

  @OneToOne(type=> Item,swaps=> Swap)
  @JoinColumn({name: 'targed_item_id'})
  targed_item_id: Item;

}
