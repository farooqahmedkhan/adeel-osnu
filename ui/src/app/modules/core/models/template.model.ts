import { Field } from "./field.model";

export interface Template {
    id: Number,
    title: string,
    name: String,
    message: String,
    os: String,
    additional_fields: Field[],
    big_picture: String
}