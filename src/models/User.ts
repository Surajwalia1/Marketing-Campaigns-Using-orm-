import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * User entity representing the properties of a user in the system.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Primary key (auto-generated)

  @Column({ unique: true })
  email!: string; // User's email (must be unique)

  @Column()
  password!: string; // User's password

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role!: string; // User's role (admin or user)

  @Column({ nullable: true })
  category!: string; // User's category (optional, for targeted campaigns)
}
