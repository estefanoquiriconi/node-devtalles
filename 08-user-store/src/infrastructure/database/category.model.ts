import mongoose, { Schema, Document } from 'mongoose';

export interface ICategoryModel extends Document {
  name: string;
  available: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategoryModel>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      unique: true,
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
      maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
    },
    available: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      ref: 'User',
      required: [true, 'El usuario es requerido'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

export const CategoryModel = mongoose.model<ICategoryModel>(
  'Category',
  categorySchema
);
