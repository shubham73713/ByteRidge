import { Component, OnInit ,ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';
import * as moment from 'moment';

import { Audit, User } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    currentUser: User;
    audits = [];
    moment: any = moment;
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    )
    {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit()
    {
        this.loadAllAudits();
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe((audits)=>{
                this.audits = audits;
                this.audits.map((elem)=>{
                    var date2 = new Date(Number(elem.logoutTime));
                    var date =  new Date(Number(elem.loginTime));
                    elem.loginTime = moment(date).format('MM/DD/YYYY HH:mm:ss');
                    elem.logoutTime = moment(date2).format('MM/DD/YYYY HH:mm:ss');
                  }
        
                );
                
    })

    }
}