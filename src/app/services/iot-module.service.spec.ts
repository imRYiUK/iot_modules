import { TestBed } from '@angular/core/testing';

import { IotModuleService } from './iot-module.service';

describe('IotModuleService', () => {
  let service: IotModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
