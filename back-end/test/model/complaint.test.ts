import { Complaint } from '../../model/complaint';

describe('Complaint domain object test', () => {
    test('given: valid values for complaint, when: complaint is created, then: complaint is created with those values', () => {
        
        const complaint = new Complaint({
            id: 1,
            message: 'This is a test complaint message',
            userId: 1001
        });

        
        expect(complaint.getId()).toBe(1);
        expect(complaint.getMessage()).toBe('This is a test complaint message');
        expect(complaint.getUserId()).toBe(1001);
    });
});
