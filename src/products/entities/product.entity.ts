import { Category } from 'src/categories/entity/category.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  
  @Entity()
  export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    productId: string;
  
    @Column()
    name: string;
  
    @Column('text')
    description: string;
  
    @Column()
    quantity: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
  
    @Column({ nullable: true })
    supplierInfo?: string;
  
    @CreateDateColumn()
    dateAdded: Date;
  
    @UpdateDateColumn()
    lastUpdated: Date;
  
    @ManyToOne(() => Category, (category) => category.products, { eager: true, onDelete: 'SET NULL' })
    category: Category;

    @Column({ default: 10 }) // Default threshold for low stock alert
    lowStockThreshold: number;
  }
  