import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'

export type State = {
    code:string;
    name:string;
    id: string;
}

@Injectable()
export class StateService {
    private states: State[] = [];

    async getAll(): Promise<State[] | undefined >{
        this.states = [];
        const firestore = new admin.firestore.Firestore();
        
        (await firestore.collection('states').get()).docs.map( data =>{
            this.states.push({
                code: data.get('code'),
                name: data.get('name'),
                id: data.id,
            })
        })
        return this.states
    }
    async create(body: any): Promise<Boolean>{
        const firestore = new admin.firestore.Firestore();
        var promises = []
        body.data.forEach(element => {
            promises.push(firestore.collection('states').add({
                name:element.name,
                code: element.code,
            }))
        });
        (await Promise.all(promises))
        return true
    }
    async updateOne(code: string, name: string, id: string): Promise<Boolean>{
        const firestore = new admin.firestore.Firestore();
        (await firestore.collection('states').doc(id).update({
            name:name,
            code: code,
        }))
        return true
    }

    async deleteOne(id: string): Promise<Boolean>{
        const firestore = new admin.firestore.Firestore();
        (await firestore.collection('states').doc(id).delete())
        return true
    }
}
