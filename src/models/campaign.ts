import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Interface representing the properties of a Campaign entity.
 */
@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string; // The content of the campaign

  @Column()
  category!: string; // User category (all, specific category)

  @CreateDateColumn()
  scheduledTime!: Date; // When the campaign should be sent

  @Column({ nullable: true })
  repeatPattern?: string; // Optional, for recurring campaigns

  @Column({ default: 'pending' })
  status!: string; // Status (e.g., 'pending', 'executed', etc.)

  // Timestamps to track when the record was created or updated
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
